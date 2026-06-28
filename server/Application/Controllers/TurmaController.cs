using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Infrastructure;
using server.Services;
using System.Linq;
using System.Collections.Generic;
using System;
using System.IO;
using System.IO.Compression;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TurmaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly CertificadoService _certificadoService;

        public TurmaController(AppDbContext context, CertificadoService certificadoService)
        {
            _context = context;
            _certificadoService = certificadoService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Turmas.Include(t => t.Alunos).Include(t => t.Oficina).ToList());
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] TurmaCreateDto dto)
        {
            var turma = new Turma
            {
                DataInicio = dto.DataInicio,
                DataTermino = dto.DataTermino,
                Status = dto.Status,
                OficinaId = dto.OficinaId,
                VoluntarioId = dto.VoluntarioId,
                Alunos = _context.Alunos.Where(a => dto.AlunosIds.Contains(a.Id)).ToList()
            };

            _context.Turmas.Add(turma);
            _context.SaveChanges();
            return Ok(turma);
        }

        [HttpPut("update/{id}")]
        public IActionResult Update(int id, [FromBody] TurmaCreateDto dto)
        {
            var turma = _context.Turmas.Include(t => t.Alunos).FirstOrDefault(t => t.Id == id);
            if (turma == null) return NotFound("Turma não encontrada.");

            turma.DataInicio = dto.DataInicio;
            turma.DataTermino = dto.DataTermino;
            turma.Status = dto.Status;
            turma.OficinaId = dto.OficinaId;
            turma.VoluntarioId = dto.VoluntarioId;
            turma.Alunos = _context.Alunos.Where(a => dto.AlunosIds.Contains(a.Id)).ToList();

            _context.SaveChanges();
            return Ok(turma);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var turma = _context.Turmas.Find(id);
            if (turma == null) return NotFound("Turma não encontrada.");

            _context.Turmas.Remove(turma);
            _context.SaveChanges();
            return Ok(new { message = "Turma deletada com sucesso." });
        }

        [HttpGet("TodosCertificados/{turmaId}")]
        public IActionResult GetTodosCertificados(int turmaId)
        {
            var turma = _context.Turmas
                .Include(t => t.Alunos)
                .Include(t => t.Oficina)
                .FirstOrDefault(t => t.Id == turmaId);

            if (turma == null) return NotFound("Turma não encontrada.");
            if (turma.Alunos == null || !turma.Alunos.Any()) return NotFound("Nenhum aluno vinculado.");

            using (var memoryStream = new MemoryStream())
            {
                using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
                {
                    foreach (var aluno in turma.Alunos)
                    {
                        var codigoAutenticidade = Guid.NewGuid().ToString("N").ToUpper();

                        var pdfBytes = _certificadoService.GerarCertificado(
                            aluno.Nome,
                            turma.Oficina?.Nome ?? "Oficina Não Definida",
                            turma.DataInicio,
                            turma.DataTermino,
                            16,
                            codigoAutenticidade
                        );

                        var entry = archive.CreateEntry($"Certificado_{aluno.Nome.Replace(" ", "_")}.pdf");
                        using (var entryStream = entry.Open())
                        {
                            entryStream.Write(pdfBytes, 0, pdfBytes.Length);
                        }
                    }
                }

                return File(memoryStream.ToArray(), "application/zip", $"Certificados_Turma_{turmaId}.zip");
            }
        }
    }
}
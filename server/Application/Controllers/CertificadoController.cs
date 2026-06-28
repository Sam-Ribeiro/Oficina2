using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Infrastructure;
using server.Services;
using System;
using System.Linq;

namespace server.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CertificadoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly CertificadoService _certificadoService;

        public CertificadoController(AppDbContext context, CertificadoService certificadoService)
        {
            _context = context;
            _certificadoService = certificadoService;
        }

        [HttpGet("gerar/{alunoId}/{turmaId}")]
        public IActionResult GerarCertificado(int alunoId, int turmaId)
        {
            var aluno = _context.Alunos.FirstOrDefault(a => a.Id == alunoId);

            if (aluno == null)
                return NotFound("Aluno não encontrado.");

            var turma = _context.Turmas
                .Include(t => t.Oficina)
                .FirstOrDefault(t => t.Id == turmaId);

            if (turma == null)
                return NotFound("Turma não encontrada no banco de dados.");

            var codigoAutenticidade = Guid.NewGuid().ToString("N").ToUpper();

            var pdfBytes = _certificadoService.GerarCertificado(
                nomeAluno: aluno.Nome,
                nomeOficina: turma.Oficina != null ? turma.Oficina.Nome : "Oficina Não Definida",
                dataInicio: turma.DataInicio,
                dataFim: turma.DataTermino,
                cargaHoraria: 16,
                codigoAutenticidade: codigoAutenticidade
            );

            return File(pdfBytes, "application/pdf", $"Certificado_{aluno.Nome.Replace(" ", "_")}.pdf");
        }
    }
}
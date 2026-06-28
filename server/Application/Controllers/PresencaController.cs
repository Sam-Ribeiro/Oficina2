using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Infrastructure;
using System.Linq;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PresencaController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PresencaController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll(int? aulaId)
        {
            if (aulaId.HasValue)
            {
                var presencaFiltradas= _context.Presencas
                    .Where(p => p.AulaId == aulaId.Value)
                    .ToList();

                return Ok(presencaFiltradas);
            }


            return Ok(_context.Presencas.ToList());
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] PresencaCreateDto dto)
        {
            var presenca = new Presenca
            {
                AulaId = dto.AulaId,
                AlunoId = dto.AlunoId,
                Presente = dto.Presente
            };
            _context.Presencas.Add(presenca);
            _context.SaveChanges();
            return Ok(presenca);
        }

        [HttpPut("update/{id}")]
        public IActionResult Update(int id, [FromBody] PresencaCreateDto dto)
        {
            var presenca = _context.Presencas.Find(id);
            if (presenca == null) return NotFound();

            presenca.AulaId = dto.AulaId;
            presenca.AlunoId = dto.AlunoId;
            presenca.Presente = dto.Presente;

            _context.SaveChanges();
            return Ok(presenca);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var presenca = _context.Presencas.Find(id);
            if (presenca == null) return NotFound();

            _context.Presencas.Remove(presenca);
            _context.SaveChanges();
            return Ok(new { message = "Presença removida com sucesso." });
        }
    }
}
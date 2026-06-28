using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Infrastructure;
using System.Linq;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AulaController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AulaController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll(int? turmaId)
        {
            
            if (turmaId.HasValue)
            {
                var aulasFiltradas = _context.Aulas
                    .Where(a => a.TurmaId == turmaId.Value)
                    .ToList();

                return Ok(aulasFiltradas);
            }

            
            return Ok(_context.Aulas.ToList());
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] AulaCreateDto dto)
        {
            var aula = new Aula
            {
                Tema = dto.Tema,
                DataHora = dto.DataHora,
                Status = dto.Status,
                TurmaId = dto.TurmaId
            };
            _context.Aulas.Add(aula);
            _context.SaveChanges();
            return Ok(aula);
        }

        [HttpPut("update/{id}")]
        public IActionResult Update(int id, [FromBody] AulaCreateDto dto)
        {
            var aula = _context.Aulas.Find(id);
            if (aula == null) return NotFound();

            aula.Tema = dto.Tema;
            aula.DataHora = dto.DataHora;
            aula.Status = dto.Status;
            aula.TurmaId = dto.TurmaId;

            _context.SaveChanges();
            return Ok(aula);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var aula = _context.Aulas.Find(id);
            if (aula == null) return NotFound();
            _context.Aulas.Remove(aula);
            _context.SaveChanges();
            return Ok(new { message = "Aula deletada." });
        }
    }
}
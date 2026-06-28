using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            
            var query = _context.Presencas.Include(p => p.Aluno).AsQueryable();

            if (aulaId.HasValue)
            {
                query = query.Where(p => p.AulaId == aulaId.Value);
            }

           
            return Ok(query.ToList());
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
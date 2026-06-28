using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Infrastructure;
using System.Linq;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OficinaController : ControllerBase
    {
        private readonly AppDbContext _context;
        public OficinaController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Oficinas.ToList());

        [HttpPost("create")]
        public IActionResult Create([FromBody] OficinaCreateDto dto)
        {
            var oficina = new Oficina { Nome = dto.Nome, Descricao = dto.Descricao };
            _context.Oficinas.Add(oficina);
            _context.SaveChanges();
            return Ok(oficina);
        }

        [HttpPut("update/{id}")]
        public IActionResult Update(int id, [FromBody] OficinaCreateDto dto)
        {
            var oficina = _context.Oficinas.Find(id);
            if (oficina == null) return NotFound();
            oficina.Nome = dto.Nome;
            oficina.Descricao = dto.Descricao;
            _context.SaveChanges();
            return Ok(oficina);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var oficina = _context.Oficinas.Find(id);
            if (oficina == null) return NotFound();
            _context.Oficinas.Remove(oficina);
            _context.SaveChanges();
            return Ok(new { message = "Oficina deletada." });
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;

namespace server.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VoluntarioController : ControllerBase
    {
        private readonly IVoluntarioRepository _repository;

        public VoluntarioController(IVoluntarioRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("create")]
        public IActionResult CreateVoluntario([FromBody] Voluntario voluntario)
        {
            _repository.AddVoluntario(voluntario);
            return Ok(new { message = "Voluntário cadastrado com sucesso!" });
        }

        [HttpGet("get")]
        public IActionResult GetVoluntarios() => Ok(_repository.GetVoluntarios());

        // --- MÉTODOS NOVOS DO CRUD ---

        [HttpGet("get/{id}")]
        public IActionResult GetVoluntarioById(int id)
        {
            var voluntario = _repository.GetVoluntarioById(id);
            if (voluntario == null) return NotFound();
            return Ok(voluntario);
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdateVoluntario([FromBody] Voluntario voluntario, int id)
        {
            _repository.UpdateVoluntario(voluntario, id);
            return Ok(new { message = "Voluntário atualizado!" });
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteVoluntario(int id)
        {
            _repository.DeleteVoluntario(id);
            return Ok(new { message = "Voluntário deletado!" });
        }
    }
}
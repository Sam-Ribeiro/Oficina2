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
        public IActionResult GetVoluntarios()
        {
            var voluntarios = _repository.GetVoluntarios();
            return Ok(voluntarios);
        }

       
    }
}
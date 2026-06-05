using Microsoft.AspNetCore.Mvc;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;

namespace server.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PresencaController : ControllerBase
    {
        private readonly IPresencaRepository _repository;
        public PresencaController(IPresencaRepository repository) { _repository = repository; }

        [HttpPost("create")]
        public IActionResult CreatePresenca([FromBody] Presenca presenca)
        {
            _repository.AddPresenca(presenca);
            return Ok(new { message = "Presença registrada!" });
        }

        [HttpGet("get")]
        public IActionResult GetPresencas() => Ok(_repository.GetPresencas());
    }
}
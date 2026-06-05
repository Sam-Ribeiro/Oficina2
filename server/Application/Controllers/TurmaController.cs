using Microsoft.AspNetCore.Mvc;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;

namespace server.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TurmaController : ControllerBase
    {
        private readonly ITurmaRepository _repository;
        public TurmaController(ITurmaRepository repository) { _repository = repository; }

        [HttpPost("create")]
        public IActionResult CreateTurma([FromBody] Turma turma)
        {
            _repository.AddTurma(turma);
            return Ok(new { message = "Turma cadastrada com sucesso!" });
        }

        [HttpGet("get")]
        public IActionResult GetTurmas() => Ok(_repository.GetTurmas());
    }
}
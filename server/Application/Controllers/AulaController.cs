using Microsoft.AspNetCore.Mvc;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;

namespace server.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AulaController : ControllerBase
    {
        private readonly IAulaRepository _repository;

        public AulaController(IAulaRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("create")]
        public IActionResult CreateAula([FromBody] Aula aula)
        {
            _repository.AddAula(aula);
            return Ok(new { message = "Aula cadastrada com sucesso!" });
        }

        [HttpGet("get")]
        public IActionResult GetAulas()
        {
            return Ok(_repository.GetAulas());
        }
    }
}
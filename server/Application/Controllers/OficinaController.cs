using Microsoft.AspNetCore.Mvc;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;

namespace server.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OficinaController : ControllerBase
    {
        private readonly IOficinaRepository _repository;

        public OficinaController(IOficinaRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("create")]
        public IActionResult CreateOficina([FromBody] Oficina oficina)
        {
            _repository.AddOficina(oficina);
            return Ok(new { message = "Oficina cadastrada com sucesso!" });
        }

        [HttpGet("get")]
        public IActionResult GetOficinas()
        {
            return Ok(_repository.GetOficinas());
        }
    }
}
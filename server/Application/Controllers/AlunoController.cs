using Microsoft.AspNetCore.Mvc;
using server.Infrastructure.Repositories;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;

namespace server.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunoController : ControllerBase
    {
        private readonly IAlunoRepository repository;
        
        public AlunoController(IAlunoRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet("get/{id}")]
        public IActionResult GetAlunoById(int id)
        {
            var aluno = repository.GetAlunoById(id);
            if (aluno == null)
            {
                return NotFound();
            }
            return Ok(aluno);
        }

        [HttpGet("get")]
        public IActionResult GetAlunos()
        {
            var alunos = repository.GetAlunos();
            return Ok(alunos);
        }

        [HttpPost("create")]
        public IActionResult CreateAluno([FromBody] Aluno aluno)
        {
            repository.AddAluno(aluno);
            return Ok();
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdateAluno(int id, [FromBody] Aluno aluno)
        {
            var existingAluno = repository.GetAlunoById(id);
            if (existingAluno == null)
            {
                return NotFound();
            }
            repository.UpdateAluno(aluno, id);
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteAluno(int id) {
            repository.DeleteAluno(id);
            return Ok();
        }
    }
}

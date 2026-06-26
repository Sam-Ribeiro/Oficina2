using Microsoft.AspNetCore.Mvc;
using server.Infrastructure;
using server.Models;
using server.Services;
using System.Linq;

namespace server.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

      
        public class LoginDto
        {
            public string Login { get; set; }
            public string Senha { get; set; }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            
            Pessoa pessoa = _context.Alunos.FirstOrDefault(p => p.Login == loginDto.Login && p.Senha == loginDto.Senha);

            
            if (pessoa == null)
            {
                pessoa = _context.Voluntarios.FirstOrDefault(p => p.Login == loginDto.Login && p.Senha == loginDto.Senha);
            }

            
            if (pessoa == null)
            {
                return Unauthorized(new { message = "Login ou senha inválidos" });
            }

            
            var token = _tokenService.GenerateToken(pessoa);

           
            return Ok(new
            {
                usuario = new { pessoa.Id, pessoa.Nome, pessoa.Login, pessoa.Role },
                token = token
            });
        }
    }
}
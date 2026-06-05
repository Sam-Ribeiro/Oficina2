using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Infrastructure
{
    
    public class AppDbContext : DbContext
    {
        
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }


        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Voluntario> Voluntarios { get; set; }
        public DbSet<Oficina> Oficinas { get; set; } 
        public DbSet<Aula> Aulas { get; set; }
        public DbSet<Turma> Turmas { get; set; }       
        public DbSet<Presenca> Presencas { get; set; } 


    }
}
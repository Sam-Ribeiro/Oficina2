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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Turma>()
                .HasMany(t => t.Alunos)
                .WithMany(a => a.Turmas)
                .UsingEntity(j => j.ToTable("AlunoTurma"));

            
            modelBuilder.Entity<Voluntario>().HasData(new Voluntario
            {
                Id = 1,
                Nome = "Administrador",
                
                CPF = "00000000000",       
                Email = "admin@admin.com",
                RA= "123",
                Senha = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
                Role = "Voluntario"
            });
        }
    }
}
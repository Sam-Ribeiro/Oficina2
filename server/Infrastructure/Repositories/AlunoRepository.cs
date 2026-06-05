using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using System.Collections.Generic;
using System.Linq;

namespace server.Infrastructure.Repositories
{
    public class AlunoRepository : IAlunoRepository
    {
      
        private readonly AppDbContext _context;

        public AlunoRepository(AppDbContext context)
        {
            _context = context;
        }

        public void AddAluno(Aluno aluno)
        {
            _context.Alunos.Add(aluno);
            _context.SaveChanges(); 
        }

        public void DeleteAluno(int id)
        {
            var aluno = _context.Alunos.FirstOrDefault(a => a.Id == id);

            if (aluno != null)
            {
                _context.Alunos.Remove(aluno);
                _context.SaveChanges();
            }
        }

        public Aluno GetAlunoById(int id)
        {
            return _context.Alunos.FirstOrDefault(a => a.Id == id);
        }

        public List<Aluno> GetAlunos()
        {
            
            return _context.Alunos.ToList();
        }

        public void UpdateAluno(Aluno updatedAluno, int id)
        {
            var aluno = _context.Alunos.FirstOrDefault(a => a.Id == id);

            if (aluno != null)
            {
                aluno.Nome = updatedAluno.Nome;
                aluno.Email = updatedAluno.Email;
                aluno.CPF = updatedAluno.CPF;
                aluno.Idade = updatedAluno.Idade;

                _context.SaveChanges();
            }
        }
    }

}

using server.Infrastructure.Data;
using server.Infrastructure.Repositories.Interfaces;
using server.Models;

namespace server.Infrastructure.Repositories
{
    public class AlunoRepository : IAlunoRepository
    {
        public InMemoryContext context;

        public AlunoRepository(InMemoryContext context)
        {
            this.context = context;
            context.LoadContexts();
        }

        public void AddAluno(Aluno aluno)
        {
            context.LoadContexts();
            context.alunos.Add(aluno);
            context.SaveChanges();
        }

        public void DeleteAluno(int id)
        {
            context.LoadContexts();
            var aluno = context.alunos.FirstOrDefault(a => a.Id == id);

            if (aluno == null)
                return;

            context.alunos.Remove(aluno);
            context.SaveChanges();
        }

        public Aluno? GetAlunoById(int id)
        {
            context.LoadContexts();
            return context.alunos.FirstOrDefault(a => a.Id.Equals(id));
        }

        public List<Aluno>? GetAlunos()
        {
            context.LoadContexts();
            return context.alunos;
        }

        public void UpdateAluno(Aluno updatedAluno, int id)
        {
            context.LoadContexts();

            var aluno = context.alunos.FirstOrDefault(p => p.Id == id);

            if (aluno == null)
                return;

            aluno.Nome = updatedAluno.Nome;
            aluno.Email = updatedAluno.Email;
            aluno.CPF = updatedAluno.CPF;
            aluno.Idade = updatedAluno.Idade;

            context.SaveChanges();
        }
    }
}

using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using System.Collections.Generic;
using System.Linq;

namespace server.Infrastructure.Repositories
{
    public class TurmaRepository : ITurmaRepository
    {
        private readonly AppDbContext _context;
        public TurmaRepository(AppDbContext context) { _context = context; }

        public void AddTurma(Turma turma)
        {
            _context.Turmas.Add(turma);
            _context.SaveChanges();
        }
        public List<Turma> GetTurmas() => _context.Turmas.ToList();
    }
}
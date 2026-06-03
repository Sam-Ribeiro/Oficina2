using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using System.Collections.Generic;
using System.Linq;

namespace server.Infrastructure.Repositories
{
    public class AulaRepository : IAulaRepository
    {
        private readonly AppDbContext _context;

        public AulaRepository(AppDbContext context)
        {
            _context = context;
        }

        public void AddAula(Aula aula)
        {
            _context.Aulas.Add(aula);
            _context.SaveChanges();
        }

        public List<Aula> GetAulas()
        {
            return _context.Aulas.ToList();
        }
    }
}
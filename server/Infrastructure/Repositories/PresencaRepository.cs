using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using System.Collections.Generic;
using System.Linq;

namespace server.Infrastructure.Repositories
{
    public class PresencaRepository : IPresencaRepository
    {
        private readonly AppDbContext _context;
        public PresencaRepository(AppDbContext context) { _context = context; }

        public void AddPresenca(Presenca presenca)
        {
            _context.Presencas.Add(presenca);
            _context.SaveChanges();
        }
        public List<Presenca> GetPresencas() => _context.Presencas.ToList();
    }
}
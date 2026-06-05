using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using System.Collections.Generic;
using System.Linq;

namespace server.Infrastructure.Repositories
{
    public class OficinaRepository : IOficinaRepository
    {
        private readonly AppDbContext _context;

        public OficinaRepository(AppDbContext context)
        {
            _context = context;
        }

        public void AddOficina(Oficina oficina)
        {
            _context.Oficinas.Add(oficina);
            _context.SaveChanges();
        }

        public List<Oficina> GetOficinas()
        {
            return _context.Oficinas.ToList();
        }
    }
}
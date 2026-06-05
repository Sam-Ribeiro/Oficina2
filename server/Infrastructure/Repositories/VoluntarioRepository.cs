using server.Infrastructure.Repositories.Interfaces;
using server.Models;
using System.Collections.Generic;
using System.Linq;

namespace server.Infrastructure.Repositories
{
    public class VoluntarioRepository : IVoluntarioRepository
    {
        private readonly AppDbContext _context;

        public VoluntarioRepository(AppDbContext context)
        {
            _context = context;
        }

        public void AddVoluntario(Voluntario voluntario)
        {
            _context.Voluntarios.Add(voluntario);
            _context.SaveChanges();
        }

        public List<Voluntario> GetVoluntarios() => _context.Voluntarios.ToList();

        // --- MÉTODOS NOVOS DO CRUD ---

        public Voluntario GetVoluntarioById(int id)
        {
            return _context.Voluntarios.FirstOrDefault(v => v.Id == id);
        }

        public void UpdateVoluntario(Voluntario updatedVoluntario, int id)
        {
            var voluntario = _context.Voluntarios.FirstOrDefault(v => v.Id == id);
            if (voluntario != null)
            {
                voluntario.Nome = updatedVoluntario.Nome;
                voluntario.Email = updatedVoluntario.Email;
                voluntario.CPF = updatedVoluntario.CPF;
                voluntario.Idade = updatedVoluntario.Idade;
                voluntario.RA = updatedVoluntario.RA;
                voluntario.Senha = updatedVoluntario.Senha;

                _context.SaveChanges();
            }
        }

        public void DeleteVoluntario(int id)
        {
            var voluntario = _context.Voluntarios.FirstOrDefault(v => v.Id == id);
            if (voluntario != null)
            {
                _context.Voluntarios.Remove(voluntario);
                _context.SaveChanges();
            }
        }
    }
}
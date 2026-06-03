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

        public void DeleteVoluntario(int id)
        {
            var voluntario = _context.Voluntarios.FirstOrDefault(v => v.Id == id);

            if (voluntario != null)
            {
                _context.Voluntarios.Remove(voluntario);
                _context.SaveChanges();
            }
        }

        public Voluntario GetVoluntarioById(int id)
        {
            return _context.Voluntarios.FirstOrDefault(v => v.Id == id);
        }

        public List<Voluntario> GetVoluntarios()
        {
            return _context.Voluntarios.ToList();
        }

        public void UpdateVoluntario(Voluntario updatedVoluntario, int id)
        {
            var voluntario = _context.Voluntarios.FirstOrDefault(v => v.Id == id);

            if (voluntario != null)
            {
                // Propriedades herdadas de Pessoa
                voluntario.Nome = updatedVoluntario.Nome;
                voluntario.Email = updatedVoluntario.Email;
                voluntario.CPF = updatedVoluntario.CPF;
                voluntario.Idade = updatedVoluntario.Idade;

                // Propriedade específica de Voluntario
                voluntario.RA = updatedVoluntario.RA;

                _context.SaveChanges();
            }
        }
    }
}
using System;
using System.Collections.Generic;

namespace server.Models
{
    public class Turma
    {
        public int Id { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataTermino { get; set; }
        public string Status { get; set; }

        public int OficinaId { get; set; }
        public Oficina Oficina { get; set; }

        public int VoluntarioId { get; set; }
        public Voluntario Voluntario { get; set; }

       
        public List<Aluno> Alunos { get; set; } = new List<Aluno>();
        public List<Aula> Aulas { get; set; } = new List<Aula>();
    }
}
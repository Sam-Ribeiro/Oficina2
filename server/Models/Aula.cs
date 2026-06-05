using System;
using System.Collections.Generic;

namespace server.Models
{
    public class Aula
    {
        public int Id { get; set; }
        public string Tema { get; set; }
        public DateTime DataHora { get; set; }
        public string Status { get; set; }

        public int TurmaId { get; set; }
        public Turma Turma { get; set; }

        public List<Presenca> Presencas { get; set; } = new List<Presenca>();
    }
}
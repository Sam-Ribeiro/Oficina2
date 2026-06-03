using System;

namespace server.Models
{
    public class Aula
    {
        public int Id { get; set; }
        public string Tema { get; set; }
        public DateTime DataHora { get; set; }
        public int OficinaId { get; set; }
    }
}
namespace server.Models
{

    public abstract class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CPF { get; set; }
        public string Email { get; set; }
        public int Idade { get; set; }

        
        public string Login { get; set; }
        public string Senha { get; set; }
        public string Role { get; set; } 
    }
}
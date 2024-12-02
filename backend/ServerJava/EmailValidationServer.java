import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

/**
 * Servidor de validação de e-mails.
 * Este servidor HTTP simples verifica se o formato de um e-mail fornecido é válido.
 */
public class EmailValidationServer {
    public static void main(String[] args) throws IOException {
         /* Um servidor com HttpServer.create() e o inicia (server.start())
          automaticamente escuta conexões em um Socket interno.      
          e não precisa chamar accept() manualmente porque o HttpServer já faz isso , e entrega
          a conexão encapsulada no objeto HttpExchange. -> void handle(HttpeExchange exchange)
         */
        HttpServer server = HttpServer.create(new InetSocketAddress(9000), 0); //Cria um servidor HTTP na rota 9000
        System.out.println("Servidor de validacao de e-mails rodando na porta 9000...");
        /*
         * Define o contexto para a rota "/validateEmail".
         * O contexto é associado a um manipulador (EmailValidationHandler), 
         * que será chamado para processar requisições enviadas para essa rota.
         */
       // Define o contexto para a rota "/validateEmail" e associa o manipulador de validação
        server.createContext("/validateEmail", new EmailValidationHandler());
        /*
         O executor padrão processa as requisições em uma única thread,
         o que é suficiente para o nosso projeto. 
         */
        // Define o executor padrão e inicia o servidor
        server.setExecutor(null); // Usa um executor padrão (thread única)
        server.start();
        /*
         * Neste ponto, o servidor já está escutando conexões na porta 9000.
         * O método accept() do ServerSocket interno é chamado automaticamente
         * pelo HttpServer. Ele aceita conexões de clientes e passa o processamento
         * para o EmailValidationHandler, encapsulando as requisições em objetos HttpExchange.
         */
    }
    /**
     * Classe interna que lida com as requisições para a validação de e-mails.
     * Implementa a interface {@link HttpHandler} para processar as requisições HTTP.
     */
    static class EmailValidationHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Processa apenas requisições do tipo GET
            if ("GET".equals(exchange.getRequestMethod())) {
                String query = exchange.getRequestURI().getQuery();  // Obtém os parâmetros da URL
                String response;
                // Verifica se o parâmetro "email" está presente na query string
                if (query != null && query.startsWith("email=")) {
                    String email = query.split("=")[1]; // Extrai o valor do e-mail
                    // Valida o formato do e-mail
                    if (isValidEmail(email)) {
                        response = "Email válido!";
                        exchange.sendResponseHeaders(200, response.getBytes().length); // Resposta HTTP 200 (OK)
                    } else {
                        response = "Email inválido!";
                        exchange.sendResponseHeaders(400, response.getBytes().length); // Resposta HTTP 400 (Bad Request)
                    }
                } else {
                    // Caso o parâmetro "email" não seja encontrado
                    response = "Parâmetro 'email' não encontrado!";
                    exchange.sendResponseHeaders(400, response.getBytes().length); // Resposta HTTP 400 (Bad Request)
                }

                // Envia a resposta para o cliente
                OutputStream os = exchange.getResponseBody(); // Permite que o servidor envie dados para o cliente que fez a requisição
                os.write(response.getBytes()); // Escreve os dados da resposta no corpo da requisição
                os.close(); // Fecha o fluxo após enviar a resposta, liberando recursos
            } else {
                // Caso o método HTTP não seja suportado
                String response = "Método não suportado!";
                exchange.sendResponseHeaders(405, response.getBytes().length); // Resposta HTTP 405 (Method Not Allowed)
                OutputStream os = exchange.getResponseBody(); // Abre o fluxo para enviar a resposta de erro
                os.write(response.getBytes()); // Escreve a mensagem de erro no fluxo
                os.close(); // Fecha o fluxo
            }
        }
        /**
         * Valida o formato de um endereço de e-mail.
         * 
         * @param email o endereço de e-mail a ser validado
         * @return {@code true} se o e-mail for válido; {@code false} caso contrário
         */

        // Método simples para validar o formato de e-mails
        private boolean isValidEmail(String email) {
            String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
            return email.matches(emailRegex);
        }
    }
}
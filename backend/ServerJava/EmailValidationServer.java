import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

/**
 * Servidor de validação de e-mails.
 * Este servidor HTTP simples verifica se o formato de um e-mail fornecido é válido.
 */
public class EmailValidationServer {
    public static void main(String[] args) throws IOException {
        // Cria um servidor HTTP na porta 9000
        HttpServer server = HttpServer.create(new InetSocketAddress(9000), 0);
        System.out.println("Servidor de validacao de e-mails rodando na porta 9000...");

       // Define o contexto para a rota "/validateEmail" e associa o manipulador de validação
        server.createContext("/validateEmail", new EmailValidationHandler());

        // Define o executor padrão e inicia o servidor
        server.setExecutor(null); // Usa um executor padrão (thread única)
        server.start();
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
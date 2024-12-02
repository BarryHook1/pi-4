<<<<<<< Updated upstream
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
=======
import java.io.*;
import java.net.*;

public class EmailValidationServer {
    private static final int PORT = 9000;

    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println("Servidor rodando na porta " + PORT);

            while (true) {
                // Aceita conexões de clientes
                Socket clientSocket = serverSocket.accept();
                System.out.println("Conexão estabelecida com: " + clientSocket.getInetAddress());

                // Cria uma nova thread para cada conexão
                new Thread(new ClientHandler(clientSocket)).start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
>>>>>>> Stashed changes
    }
}

class ClientHandler implements Runnable {
    private Socket clientSocket;

    public ClientHandler(Socket clientSocket) {
        this.clientSocket = clientSocket;
    }

    @Override
    public void run() {
        try (BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
             BufferedWriter out = new BufferedWriter(new OutputStreamWriter(clientSocket.getOutputStream()))) {

            // Lê a mensagem enviada pelo cliente
            String input = in.readLine();
            System.out.println("Mensagem recebida: " + input);

            // Valida o formato do e-mail
            boolean isValid = isValidEmail(input);

            // Envia a resposta para o cliente
            String response = isValid ? "VALID" : "INVALID";
            out.write(response);
            out.newLine();
            out.flush();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                clientSocket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private boolean isValidEmail(String email) {
    // Regex mais robusta para validação de e-mails
    String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
    return email != null && email.matches(emailRegex);
  }
}

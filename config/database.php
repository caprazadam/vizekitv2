<?php
// VizeKit MySQL Database Configuration

class Database {
    private $host = 'localhost';
    private $db_name = 'vizekit_db';
    private $username = 'root';
    private $password = '';
    private $conn;

    // For Hostware hosting, update these values:
    // private $host = 'localhost';
    // private $db_name = 'your_database_name';
    // private $username = 'your_username';
    // private $password = 'your_password';

    public function getConnection() {
        $this->conn = null;
        
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8",
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            // For production, log this instead of displaying
            error_log("Database connection error: " . $exception->getMessage());
            return null;
        }
        
        return $this->conn;
    }
    
    public function createTables() {
        if ($this->conn) {
            $sql = file_get_contents(__DIR__ . '/../database/vizekit.sql');
            $statements = explode(';', $sql);
            
            foreach($statements as $statement) {
                $statement = trim($statement);
                if (!empty($statement)) {
                    try {
                        $this->conn->exec($statement);
                    } catch(PDOException $e) {
                        error_log("Table creation error: " . $e->getMessage());
                    }
                }
            }
        }
    }
}
?>
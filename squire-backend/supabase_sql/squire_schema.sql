-- ADD THIS TO CREATE VECTOR TABLE ON SUPABASE
CREATE TABLE document (
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    project_id TEXT,
    build_id TEXT,
    data JSON,
    timestamp TIMESTAMP,
    embedding vector (1536)
);

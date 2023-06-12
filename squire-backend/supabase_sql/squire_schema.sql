-- ADD THIS TO CREATE VECTOR TABLE ON SUPABASE
CREATE TABLE document (
    id UUID PRIMARY KEY,
    project_id TEXT,
    build_id TEXT,
    data JSON,
    timestamp TIMESTAMP,
    embedding vector (1536)
);

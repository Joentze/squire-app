CREATE OR REPLACE FUNCTION public.match_documents(
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int,
  project_id text,
  build_id text
)
RETURNS TABLE (
  id UUID,
  data JSON,
  similarity float
)
LANGUAGE SQL
AS $$
SELECT id, data, 1 - (documents.embedding <-> query_embedding) AS similarity
FROM documents
WHERE 1 - (documents.embedding <-> query_embedding) > similarity_threshold 
  AND documents.project_id = public.match_documents.project_id
  AND documents.build_id = public.match_documents.build_id
ORDER BY documents.embedding <-> query_embedding
LIMIT match_count;
$$;

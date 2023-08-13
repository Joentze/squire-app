
SELECT id, data, 1 - (document.embedding <-> query_embedding) AS similarity
FROM document
WHERE 1 - (document.embedding <-> query_embedding) > similarity_threshold 
  AND document.project_id = match_documents.project_id
  AND document.build_id = match_documents.build_id
ORDER BY document.embedding <-> query_embedding
LIMIT match_count;

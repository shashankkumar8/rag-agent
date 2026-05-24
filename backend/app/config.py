from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    OPENAI_API_KEY: str
    QDRANT_URL: str = "http://qdrant:6333"
    QDRANT_COLLECTION: str = "docs"
    EMBEDDING_MODEL: str = "text-embedding-3-small"
    LLM_MODEL: str = "gpt-4o-mini"
    MAX_K: int = 5

settings = Settings()
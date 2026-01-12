#!/usr/bin/env python
"""
Script to install and start Chroma DB server
Run this script to set up Chroma DB for the Yoga RAG application
"""

import subprocess
import sys
import os

def check_chromadb():
    """Check if chromadb is installed"""
    try:
        import chromadb
        print("✅ ChromaDB is already installed")
        return True
    except ImportError:
        print("❌ ChromaDB is not installed")
        return False

def install_chromadb():
    """Install chromadb using pip"""
    print("📦 Installing ChromaDB...")
    print("This may take 3-5 minutes. Please wait...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "chromadb"])
        print("✅ ChromaDB installed successfully!")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install ChromaDB")
        return False

def start_chroma_server():
    """Start Chroma DB server"""
    print("\n🚀 Starting Chroma DB server on http://localhost:8000")
    print("Press Ctrl+C to stop the server\n")
    
    # Create chroma_db directory if it doesn't exist
    chroma_dir = os.path.join(os.path.dirname(__file__), "chroma_db")
    os.makedirs(chroma_dir, exist_ok=True)
    
    try:
        # Start Chroma server
        from chromadb.config import Settings
        import chromadb.server.fastapi
        
        # This is a simplified approach - actually we need to use the CLI
        print("Starting server...")
        subprocess.run([sys.executable, "-m", "chromadb", "run", "--path", chroma_dir, "--port", "8000"])
    except KeyboardInterrupt:
        print("\n\n⏹️  Server stopped")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        print("\n💡 Try running manually:")
        print(f"   chroma run --path {chroma_dir} --port 8000")

if __name__ == "__main__":
    print("=" * 60)
    print("Chroma DB Setup Script")
    print("=" * 60)
    
    if not check_chromadb():
        if not install_chromadb():
            sys.exit(1)
    
    start_chroma_server()

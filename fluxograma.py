import os

def listar_estrutura(diretorio, prefixo=""):
    try:
        itens = sorted(os.listdir(diretorio))
        for i, item in enumerate(itens):
            caminho = os.path.join(diretorio, item)
            marcador = "├── " if i < len(itens) - 1 else "└── "
            print(prefixo + marcador + item)
            if os.path.isdir(caminho):
                novo_prefixo = prefixo + ("│   " if i < len(itens) - 1 else "    ")
                listar_estrutura(caminho, novo_prefixo)
    except PermissionError:
        pass  # ignora pastas protegidas

# Caminho do seu projeto
diretorio_projeto = r"D:\projetos\prefeituraAppLimpo"

print("Estrutura do projeto:\n")
listar_estrutura(diretorio_projeto)

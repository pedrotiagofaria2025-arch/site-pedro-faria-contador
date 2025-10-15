import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Calculator, FileText, TrendingUp, Users, Mail, Phone, MapPin, Clock, CheckCircle, Menu, X, Facebook, Instagram, Linkedin, Twitter, BookOpen, ArrowRight, Award, Target, Cookie, HelpCircle, ChevronDown } from 'lucide-react'
import heroImage from './assets/hero.jpg'
import officeImage from './assets/office.jpg'
import { blogPosts } from './blogData.js'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showCookieBanner, setShowCookieBanner] = useState(false)
  const [selectedBlogPost, setSelectedBlogPost] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    privacyAccepted: false
  })
  const [expandedFaq, setExpandedFaq] = useState(null)

  // Verificar se o usuário já aceitou os cookies
  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted')
    if (!cookiesAccepted) {
      setShowCookieBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setShowCookieBanner(false)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.privacyAccepted) {
      alert('Por favor, aceite a Política de Privacidade para continuar.')
      return
    }
    alert('Obrigado pelo contato! Retornarei em breve.')
    setFormData({ name: '', email: '', phone: '', message: '', privacyAccepted: false })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const openBlogPost = (post) => {
    setSelectedBlogPost(post)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeBlogPost = () => {
    setSelectedBlogPost(null)
  }

  // Se um post está selecionado, mostrar apenas ele
  if (selectedBlogPost) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header simplificado */}
        <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button onClick={closeBlogPost} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <ArrowRight className="h-5 w-5 rotate-180" />
                <span className="font-medium">Voltar</span>
              </button>
              <div className="flex items-center gap-2">
                <Calculator className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Pedro Faria</span>
              </div>
            </div>
          </nav>
        </header>

        {/* Conteúdo do artigo */}
        <article className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-8">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>{selectedBlogPost.date}</span>
                <span>•</span>
                <span>{selectedBlogPost.readTime} de leitura</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {selectedBlogPost.title}
              </h1>
              <p className="text-xl text-gray-600">
                {selectedBlogPost.excerpt}
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: selectedBlogPost.content }} />
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Button onClick={closeBlogPost} variant="outline" className="gap-2">
                <ArrowRight className="h-4 w-4 rotate-180" />
                Voltar para o site
              </Button>
            </div>
          </div>
        </article>

        {/* Footer simplificado */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 Pedro Faria - Contador Autônomo. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Banner de Cookies LGPD */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Cookie className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm">
                    Este site utiliza cookies para melhorar sua experiência e analisar o tráfego através do Google Analytics. 
                    Ao continuar navegando, você concorda com nossa{' '}
                    <button 
                      onClick={() => scrollToSection('privacidade')} 
                      className="underline hover:text-blue-400 transition-colors"
                    >
                      Política de Privacidade
                    </button>.
                  </p>
                </div>
              </div>
              <Button 
                onClick={acceptCookies} 
                className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
              >
                Aceitar Cookies
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Pedro Faria</span>
              <span className="text-sm text-gray-600 hidden sm:inline">Contador</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Início
              </button>
              <button onClick={() => scrollToSection('sobre')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Sobre
              </button>
              <button onClick={() => scrollToSection('servicos')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Serviços
              </button>
              <button onClick={() => scrollToSection('blog')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Blog
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                FAQ
              </button>
              <button onClick={() => scrollToSection('contato')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Contato
              </button>
              <Button onClick={() => scrollToSection('contato')} className="bg-blue-600 hover:bg-blue-700">
                Fale Comigo
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
                Início
              </button>
              <button onClick={() => scrollToSection('sobre')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
                Sobre
              </button>
              <button onClick={() => scrollToSection('servicos')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
                Serviços
              </button>
              <button onClick={() => scrollToSection('blog')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
                Blog
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
                FAQ
              </button>
              <button onClick={() => scrollToSection('contato')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
                Contato
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Contabilidade <span className="text-blue-600">Personalizada</span> para Seu Negócio
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Sou Pedro Faria, contador autônomo com atendimento direto e personalizado. 
                Cuido da contabilidade da sua empresa com dedicação e expertise, garantindo 
                tranquilidade e conformidade fiscal.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-blue-900 font-semibold">✨ Primeira consulta gratuita para análise da situação fiscal da sua empresa!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => scrollToSection('contato')} size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                  Fale Comigo
                </Button>
                <Button onClick={() => scrollToSection('servicos')} variant="outline" size="lg" className="text-lg px-8">
                  Conheça os Serviços
                </Button>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Atendimento Personalizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Contato Direto</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Profissional de contabilidade trabalhando em escritório moderno" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src={officeImage} 
                alt="Ambiente de trabalho profissional de contabilidade" 
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Sobre Mim
              </h2>
              <p className="text-lg text-gray-600">
                Sou Pedro Faria, contador autônomo formado em Ciências Contábeis desde 2020, com registro ativo no CRC GO-027770/O. 
                Trabalho de forma independente, oferecendo atendimento direto e personalizado para cada cliente.
              </p>
              <p className="text-lg text-gray-600">
                Minha missão é proporcionar tranquilidade e segurança aos meus clientes através de 
                serviços contábeis de qualidade, sempre atualizado com as últimas mudanças na 
                legislação tributária e fiscal. Você terá contato direto comigo em todas as etapas.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-blue-600" />
                    <span className="text-lg font-bold text-gray-900">CRC Ativo</span>
                  </div>
                  <p className="text-gray-600 text-sm">GO-027770/O</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-blue-600" />
                    <span className="text-lg font-bold text-gray-900">100%</span>
                  </div>
                  <p className="text-gray-600">Atendimento Direto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meus Serviços
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofereço soluções contábeis completas e personalizadas, com atendimento direto e dedicado.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calculator className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Contabilidade Geral</CardTitle>
                <CardDescription>
                  Escrituração contábil completa, balanços patrimoniais, demonstrativos de resultados (DRE), 
                  fluxo de caixa e relatórios gerenciais personalizados para tomada de decisões estratégicas.
                  <span className="block mt-2 text-sm italic text-gray-500">Exemplo: Ajudei uma loja de comércio eletrônico a identificar custos ocultos que estavam reduzindo a margem de lucro em 15%.</span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Assessoria Fiscal</CardTitle>
                <CardDescription>
                  Apuração e cálculo de impostos (IRPJ, CSLL, PIS, COFINS, ICMS, ISS), entrega de obrigações 
                  acessórias (SPED, EFD, DCTF) e orientação sobre legislação tributária atualizada.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Departamento Pessoal</CardTitle>
                <CardDescription>
                  Folha de pagamento completa, admissões e rescisões, controle de férias e 13º salário, 
                  eSocial, FGTS, INSS e todas as obrigações trabalhistas e previdenciárias.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Consultoria Empresarial</CardTitle>
                <CardDescription>
                  Análise financeira detalhada, planejamento estratégico, gestão de custos, 
                  orientação para crescimento sustentável e melhoria de processos internos.
                  <span className="block mt-2 text-sm italic text-gray-500">Exemplo: Orientei um prestador de serviços a reestruturar preços, resultando em aumento de 25% na rentabilidade.</span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Abertura de Empresas</CardTitle>
                <CardDescription>
                  Assessoria completa para abertura de MEI, ME, EIRELI e demais tipos societários, 
                  incluindo registro na Junta Comercial, CNPJ, inscrições estaduais e municipais.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Planejamento Tributário</CardTitle>
                <CardDescription>
                  Análise e otimização da carga tributária de forma legal e estratégica, 
                  escolha do melhor regime tributário e identificação de oportunidades de economia fiscal.
                  <span className="block mt-2 text-sm italic text-gray-500">Exemplo: Realizei migração de regime tributário para um cliente, gerando economia anual de R$ 18 mil em impostos.</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Por Que Escolher Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por Que Escolher um Contador Autônomo?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Atendimento personalizado, custos reduzidos e contato direto com o profissional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Atendimento Direto</h3>
              <p className="text-gray-600">
                Você fala diretamente comigo, sem intermediários ou burocracias.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Atendimento Personalizado</h3>
              <p className="text-gray-600">
                Conheço profundamente cada cliente e suas necessidades específicas.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Custo-Benefício</h3>
              <p className="text-gray-600">
                Honorários justos sem os custos de estrutura de grandes escritórios.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Compromisso Total</h3>
              <p className="text-gray-600">
                Dedicação exclusiva ao sucesso e conformidade do seu negócio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Blog
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Artigos e dicas sobre contabilidade, tributação e gestão empresarial.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openBlogPost(post)}>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                    Ler mais <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600">
              Tire suas dúvidas sobre os serviços de contabilidade
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === 0 ? null : 0)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-900">Como funciona o atendimento 100% online?</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedFaq === 0 ? 'rotate-180' : ''}`} />
              </button>
              {expandedFaq === 0 && (
                <div className="px-6 pb-4 text-gray-600">
                  <p>Todo o atendimento é realizado de forma digital, por WhatsApp, e-mail ou videochamada. Você envia os documentos necessários de forma eletrônica e eu cuido de toda a parte contábil, fiscal e trabalhista do seu negócio remotamente. Isso proporciona mais agilidade, economia de tempo e custos reduzidos.</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-900">Quais documentos preciso para abrir uma empresa?</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedFaq === 1 ? 'rotate-180' : ''}`} />
              </button>
              {expandedFaq === 1 && (
                <div className="px-6 pb-4 text-gray-600">
                  <p>Para abertura de empresa, você precisará de: RG e CPF dos sócios, comprovante de residência, certidão de casamento (se aplicável), contrato de locação ou escritura do imóvel onde a empresa funcionará, e definição da atividade econômica. Eu auxilio em todo o processo e oriento sobre cada etapa.</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-900">Qual a diferença entre MEI, ME e EIRELI?</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedFaq === 2 ? 'rotate-180' : ''}`} />
              </button>
              {expandedFaq === 2 && (
                <div className="px-6 pb-4 text-gray-600">
                  <p><strong>MEI (Microempreendedor Individual):</strong> Faturamento até R$ 81 mil/ano, tributação simplificada. <strong>ME (Microempresa):</strong> Faturamento até R$ 360 mil/ano, pode ter sócios. <strong>EIRELI:</strong> Empresa individual de responsabilidade limitada, exige capital social mínimo. Cada tipo tem vantagens específicas dependendo do seu negócio.</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-900">Como é feito o planejamento tributário?</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedFaq === 3 ? 'rotate-180' : ''}`} />
              </button>
              {expandedFaq === 3 && (
                <div className="px-6 pb-4 text-gray-600">
                  <p>Analiso detalhadamente o faturamento, despesas e atividades da sua empresa para identificar o regime tributário mais vantajoso (Simples Nacional, Lucro Presumido ou Lucro Real). O objetivo é reduzir legalmente a carga tributária e maximizar a lucratividade do seu negócio.</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === 4 ? null : 4)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-900">Quanto tempo leva para abrir uma empresa?</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedFaq === 4 ? 'rotate-180' : ''}`} />
              </button>
              {expandedFaq === 4 && (
                <div className="px-6 pb-4 text-gray-600">
                  <p>O prazo médio é de 5 a 15 dias úteis, dependendo do tipo de empresa e da agilidade dos órgãos públicos (Junta Comercial, Receita Federal, Prefeitura). Trabalho para agilizar ao máximo todo o processo e manter você informado em cada etapa.</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === 5 ? null : 5)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-900">Você atende empresas de todo o Brasil?</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedFaq === 5 ? 'rotate-180' : ''}`} />
              </button>
              {expandedFaq === 5 && (
                <div className="px-6 pb-4 text-gray-600">
                  <p>Sim! Como o atendimento é 100% online, posso atender empresas de qualquer lugar do Brasil. Tenho experiência com legislações de diversos estados e municípios, garantindo conformidade fiscal independentemente da sua localização.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Não encontrou a resposta que procurava?</p>
            <Button onClick={() => scrollToSection('contato')} className="bg-blue-600 hover:bg-blue-700">
              Entre em Contato
            </Button>
          </div>
        </div>
      </section>

      {/* Política de Privacidade Section */}
      <section id="privacidade" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Política de Privacidade
          </h2>
          
          <div className="space-y-6 text-gray-600">
            <p className="text-sm text-gray-500">Última atualização: Janeiro de 2025</p>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Informações que Coletamos</h3>
              <p>
                Coletamos informações que você nos fornece diretamente ao entrar em contato conosco através do formulário, 
                incluindo: nome, e-mail, telefone e mensagem. Essas informações são necessárias para que eu possa responder 
                suas solicitações e prestar os serviços de contabilidade.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Como Usamos suas Informações</h3>
              <p>Utilizo suas informações exclusivamente para:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Responder suas solicitações e dúvidas</li>
                <li>Fornecer orçamentos e propostas de serviços</li>
                <li>Prestar os serviços de contabilidade contratados</li>
                <li>Enviar informações relevantes sobre serviços (apenas com seu consentimento)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Compartilhamento de Dados</h3>
              <p>
                Não compartilho, vendo ou alugo suas informações pessoais para terceiros. Seus dados são tratados com 
                total confidencialidade e segurança, conforme exigido pela LGPD (Lei Geral de Proteção de Dados).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Segurança dos Dados</h3>
              <p>
                Implemento medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso 
                não autorizado, perda ou alteração. Seus dados são armazenados de forma segura e acessíveis apenas por mim.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">5. Seus Direitos</h3>
              <p>De acordo com a LGPD, você tem direito a:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Revogar seu consentimento a qualquer momento</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">6. Cookies e Analytics</h3>
              <p>
                Este site utiliza Google Analytics para entender como os visitantes interagem com o conteúdo. 
                Essas informações são anônimas e utilizadas apenas para melhorar a experiência do usuário.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">7. Contato</h3>
              <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política de privacidade, entre em contato:</p>
              <ul className="list-none mt-2 space-y-1">
                <li><strong>E-mail:</strong> pedrotiagofaria25@gmail.com</li>
                <li><strong>WhatsApp:</strong> (62) 99994-8445</li>
              </ul>
              <p className="mt-4">
                <strong>Compromisso:</strong> Estou comprometido em proteger sua privacidade e garantir a segurança de 
                seus dados pessoais de acordo com a LGPD (Lei nº 13.709/2018).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Entre em Contato
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estou à disposição para atender você. Entre em contato e vamos conversar sobre como posso ajudar seu negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
                  <a href="tel:+5562999948445" className="text-blue-600 hover:text-blue-700 hover:underline">(62) 99994-8445</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">E-mail</h3>
                  <a href="mailto:pedrotiagofaria25@gmail.com" className="text-blue-600 hover:text-blue-700 hover:underline">pedrotiagofaria25@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Localização</h3>
                  <p className="text-gray-600">Goiânia, Goiás</p>
                  <p className="text-sm text-gray-500">Atendimento 100% online</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Horário de Atendimento</h3>
                  <p className="text-gray-600">Segunda a Sexta: 8h às 18h</p>
                  <p className="text-gray-600">Sábado: 8h às 12h</p>
                </div>
              </div>

              {/* Google Maps */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245754.09787347!2d-49.38839!3d-16.686891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef6bd58d80867%3A0x7f2e7e8b5d3e8d8b!2sGoi%C3%A2nia%2C%20GO!5e0!3m2!1spt-BR!2sbr!4v1697000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização em Goiânia, GO"
                ></iframe>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Envie uma Mensagem</CardTitle>
                <CardDescription>
                  Preencha o formulário e entrarei em contato em breve.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="privacyAccepted"
                      name="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                    <label htmlFor="privacyAccepted" className="text-sm text-gray-600">
                      Aceito a{' '}
                      <button 
                        type="button"
                        onClick={() => scrollToSection('privacidade')} 
                        className="text-blue-600 hover:underline"
                      >
                        Política de Privacidade
                      </button>
                      {' '}e concordo com o tratamento dos meus dados pessoais.
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Pedro Faria</span>
              </div>
              <p className="text-gray-400">
                Contador autônomo oferecendo serviços personalizados de contabilidade.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-white transition-colors">
                    Início
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('sobre')} className="text-gray-400 hover:text-white transition-colors">
                    Sobre
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('servicos')} className="text-gray-400 hover:text-white transition-colors">
                    Serviços
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('blog')} className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Contato</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="tel:+5562999948445" className="hover:text-white transition-colors">(62) 99994-8445</a></li>
                <li><a href="mailto:pedrotiagofaria25@gmail.com" className="hover:text-white transition-colors">pedrotiagofaria25@gmail.com</a></li>
                <li>Goiânia, GO</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Redes Sociais</h3>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61581162670710" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-blue-600 transition-colors rounded-full p-2"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/pedrotiagocorreafaria" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-pink-600 transition-colors rounded-full p-2"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/pedro-undefined-96249438a" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-blue-700 transition-colors rounded-full p-2"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Pedro Faria - Contador Autônomo. Todos os direitos reservados.</p>
            <p className="mt-2">
              <button 
                onClick={() => scrollToSection('privacidade')} 
                className="hover:text-white transition-colors underline"
              >
                Política de Privacidade
              </button>
            </p>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante de WhatsApp */}
      <a
        href="https://wa.me/5562999948445?text=Olá%2C%20gostaria%20de%20mais%20informações%20sobre%20seus%20serviços%20de%20contabilidade"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 z-50 flex items-center justify-center"
        aria-label="Falar no WhatsApp"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  )
}

export default App


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Contact, Portfolio } from "@shared/schema";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { portfolioCategories } from "@/data/portfolioData";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [token, setToken] = useState<string | null>(null);
  
  const [newPortfolio, setNewPortfolio] = useState({
    title: "",
    category: "branding",
    categories: "",
    rowSpan: 35,
    image: null as File | null,
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Check for stored token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);
  
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      toast({ title: "Error", description: "Username and password are required" });
      return;
    }
    
    setIsLoggingIn(true);
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setToken(data.token);
        setIsLoggedIn(true);
        localStorage.setItem("admin_token", data.token);
        toast({ title: "Success", description: "Logged in successfully" });
      } else {
        toast({ title: "Error", description: data.message || "Login failed" });
      }
    } catch (error) {
      toast({ title: "Error", description: "An unexpected error occurred" });
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("admin_token");
    toast({ title: "Success", description: "Logged out successfully" });
  };
  
  // API requests with authentication
  const { data: contacts, isLoading: isLoadingContacts } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
    enabled: !!token && isLoggedIn,
    queryFn: async () => {
      const response = await fetch("/api/contacts", {
        headers: { Authorization: `Basic ${token}` }
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      
      return response.json();
    }
  });
  
  const { data: portfolioItems, isLoading: isLoadingPortfolio } = useQuery<Portfolio[]>({
    queryKey: ["/api/portfolio"],
    refetchOnWindowFocus: true
  });

  const createPortfolio = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { Authorization: `Basic ${token}` },
        body: formData,
      });
      
      if (!response.ok) throw new Error("Failed to create portfolio item");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({ title: "Success", description: "Portfolio item created" });
      setNewPortfolio({
        title: "",
        category: "branding",
        categories: "",
        rowSpan: 35,
        image: null,
      });
    },
  });

  const deletePortfolio = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Basic ${token}` },
      });
      
      if (!response.ok) throw new Error("Failed to delete portfolio item");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({ title: "Success", description: "Portfolio item deleted" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolio.image) {
      toast({ title: "Error", description: "Please select an image" });
      return;
    }

    const formData = new FormData();
    formData.append("title", newPortfolio.title);
    formData.append("category", newPortfolio.category);
    formData.append("categories", newPortfolio.categories);
    formData.append("rowSpan", String(newPortfolio.rowSpan));
    formData.append("image", newPortfolio.image);

    createPortfolio.mutate(formData);
  };

  // Login form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-secondary">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={login} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="min-h-screen w-full p-8 bg-secondary">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </div>
      
      <Tabs defaultValue="portfolio" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="portfolio">Portfolio Management</TabsTrigger>
          <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="portfolio" className="space-y-6">
          {/* Portfolio Management */}
          <Card>
            <CardHeader>
              <CardTitle>Add Portfolio Item</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newPortfolio.title}
                    onChange={(e) => setNewPortfolio(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newPortfolio.category}
                    onValueChange={(value) => setNewPortfolio(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {portfolioCategories.filter(cat => cat.id !== 'all').map(category => (
                        <SelectItem key={category.id} value={category.id}>{category.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="categories">Categories (comma-separated)</Label>
                  <Input
                    id="categories"
                    value={newPortfolio.categories}
                    onChange={(e) => setNewPortfolio(prev => ({ ...prev, categories: e.target.value }))}
                    required
                    placeholder="e.g. Branding, Logo Design"
                  />
                </div>
                <div>
                  <Label htmlFor="rowSpan">Row Span (Image Height Factor: 20-50)</Label>
                  <Input
                    id="rowSpan"
                    type="number"
                    min="20"
                    max="50"
                    value={newPortfolio.rowSpan}
                    onChange={(e) => setNewPortfolio(prev => ({ ...prev, rowSpan: parseInt(e.target.value) }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewPortfolio(prev => ({ ...prev, image: e.target.files?.[0] || null }))}
                    required
                  />
                </div>
                <Button type="submit" disabled={createPortfolio.isPending}>
                  {createPortfolio.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Portfolio Item"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <h2 className="text-xl font-bold mt-6 mb-4">Portfolio Items</h2>
          {isLoadingPortfolio ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : portfolioItems?.length === 0 ? (
            <p className="text-center py-8">No portfolio items found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioItems?.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm"><strong>Category:</strong> {item.category}</p>
                      <p className="text-sm"><strong>Categories:</strong> {item.categories}</p>
                      <div className="flex justify-end mt-4">
                        <Button 
                          variant="destructive" 
                          onClick={() => deletePortfolio.mutate(item.id)}
                          disabled={deletePortfolio.isPending}
                          size="sm"
                        >
                          {deletePortfolio.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Delete"
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="contacts">
          <h2 className="text-xl font-bold mb-4">Contact Submissions</h2>
          {isLoadingContacts ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : contacts?.length === 0 ? (
            <p className="text-center py-8">No contact submissions found</p>
          ) : (
            <div className="grid gap-4">
              {contacts?.map((contact) => (
                <Card key={contact.id}>
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p><strong>Name:</strong> {contact.name}</p>
                        <p><strong>Email:</strong> {contact.email}</p>
                        <p><strong>Subject:</strong> {contact.subject}</p>
                      </div>
                      <div>
                        <p><strong>Services:</strong> {contact.services.join(", ")}</p>
                        <p><strong>Created:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p><strong>Message:</strong></p>
                      <p className="mt-1">{contact.message}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

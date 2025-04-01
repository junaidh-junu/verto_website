
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Contact, Portfolio } from "@shared/schema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const [newPortfolio, setNewPortfolio] = useState({
    title: "",
    category: "branding",
    categories: "",
    rowSpan: 35,
    image: null as File | null,
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: contacts } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });
  
  const { data: portfolioItems } = useQuery<Portfolio[]>({
    queryKey: ["/api/portfolio"],
  });

  const createPortfolio = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/portfolio", {
        method: "POST",
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

  return (
    <div className="min-h-screen w-full p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      
      {/* Portfolio Management */}
      <Card className="mb-8">
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
              <Input
                id="category"
                value={newPortfolio.category}
                onChange={(e) => setNewPortfolio(prev => ({ ...prev, category: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="categories">Categories (comma-separated)</Label>
              <Input
                id="categories"
                value={newPortfolio.categories}
                onChange={(e) => setNewPortfolio(prev => ({ ...prev, categories: e.target.value }))}
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
              {createPortfolio.isPending ? "Creating..." : "Create Portfolio Item"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Portfolio Items</h2>
      <div className="grid gap-4 mb-8">
        {portfolioItems?.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p><strong>Title:</strong> {item.title}</p>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Categories:</strong> {item.categories}</p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={() => deletePortfolio.mutate(item.id)}
                  disabled={deletePortfolio.isPending}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Contact Submissions</h2>
      <div className="grid gap-4">
        {contacts?.map((contact) => (
          <Card key={contact.id}>
            <CardContent className="p-4">
              <p><strong>Name:</strong> {contact.name}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Subject:</strong> {contact.subject}</p>
              <p><strong>Message:</strong> {contact.message}</p>
              <p><strong>Services:</strong> {contact.services.join(", ")}</p>
              <p><strong>Created:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

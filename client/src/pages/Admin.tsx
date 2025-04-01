
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Contact } from "@shared/schema";

export default function Admin() {
  const { data: contacts } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  return (
    <div className="min-h-screen w-full p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
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

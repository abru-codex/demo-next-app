"use client";
import { useEffect, useState } from "react";
import websiteService from "@/services/websiteService";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Website {
  id: number;
  name: string;
  domain: string;
  description: string;
}

export default function WebsitePage() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [formData, setFormData] = useState<Website>({ id: 0, name: "", domain: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      const data = await websiteService.getAll();
      setWebsites(data);
    } catch (error) {
      console.error("Error fetching websites:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await websiteService.update(editingId.toString(), formData);
      } else {
        await websiteService.create(formData);
      }
      setFormData({ id: 0, name: "", domain: "", description: "" });
      setEditingId(null);
      setIsModalOpen(false);
      fetchWebsites();
    } catch (error) {
      console.error("Error saving website:", error);
    }
  };

  const handleEdit = (website: Website) => {
    setFormData(website);
    setEditingId(website.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await websiteService.delete(id.toString());
      fetchWebsites();
    } catch (error) {
      console.error("Error deleting website:", error);
    }
  };

  return (
    <div className="mx-auto px-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Websites</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setFormData({ id: 0, name: "", domain: "", description: "" });
              setEditingId(null);
            }}>
              Add Website
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Website" : "Create New Website"}</DialogTitle>
              <DialogDescription>
            Click create website when you're done.
          </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Website name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Domain</label>
                <Input
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  placeholder="example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Website description"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingId ? "Save Changes" : "Create Website"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {websites.map((website) => (
              <TableRow key={website.id}>
                <TableCell>{website.id}</TableCell>
                <TableCell>{website.name}</TableCell>
                <TableCell>{website.domain}</TableCell>
                <TableCell>{website.description}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(website)}
                  >
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the website.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(website.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
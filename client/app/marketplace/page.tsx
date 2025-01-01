import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for demonstration
const products = [
  {
    id: 1,
    title: "Digital Art Collection",
    creator: "Jane Doe",
    price: 29.99,
    category: "Art",
  },
  {
    id: 2,
    title: "Photography Masterclass",
    creator: "John Smith",
    price: 49.99,
    category: "Education",
  },
  {
    id: 3,
    title: "Exclusive Beats Pack",
    creator: "DJ Awesome",
    price: 19.99,
    category: "Music",
  },
  {
    id: 4,
    title: "Graphic Design Templates",
    creator: "Design Pro",
    price: 39.99,
    category: "Design",
  },
  {
    id: 5,
    title: "Coding Tutorial Series",
    creator: "Tech Guru",
    price: 59.99,
    category: "Education",
  },
  {
    id: 6,
    title: "Stock Photo Bundle",
    creator: "Capture King",
    price: 24.99,
    category: "Photography",
  },
];

export default function MarketplacePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Discover Amazing Content</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2">
          <Input className="w-full" placeholder="Search for content..." />
        </div>
        <div className="flex w-full md:w-auto space-x-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="art">Art</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
            </SelectContent>
          </Select>
          <Button>Filter</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-2">
                By {product.creator}
              </p>
              <p className="text-sm text-muted-foreground">
                Category: {product.category}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
              <Button>Buy Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

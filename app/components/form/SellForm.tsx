import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SelectCategory from '../SelectCategory';
import WYSIWYGEditor from '../WYSIWYGEditor';

const SellForm = () => {
  return (
    <form>
      <CardHeader>
        <CardTitle>Sell your product with ease</CardTitle>
        <CardDescription>
          Please describe your product here in detail so that it can be sold
        </CardDescription>
        <CardContent className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-2">
            <Label>Name</Label>
            <Input
              name="name"
              type="text"
              placeholder="Name of your Product"
              required
              minLength={3}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Category</Label>
            <SelectCategory />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              placeholder="29$"
              type="number"
              name="price"
              required
              min={1}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Small Summary</Label>
            <Textarea
              name="smallDescription"
              placeholder="Pleae describe your product shortly right here..."
              required
              minLength={10}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <WYSIWYGEditor />
          </div>
        </CardContent>
      </CardHeader>
    </form>
  );
};

export default SellForm;

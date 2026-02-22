import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTag } from "./useDialogTagSection";
import { FC } from "react";

type DialogTagSectionProps = {
  isTagExist: (tagId: string) => boolean;
  handleTagToggle: (tagId: string) => void;
};

const DialogTagSection: FC<DialogTagSectionProps> = ({
  isTagExist,
  handleTagToggle,
}) => {
  const { tags, handleCreateTag, newTagName, setNewTagName } = useTag();

  return (
    <div className="space-y-2">
      <Label>Tags</Label>
      <div className="space-y-2">
        {tags &&
          tags.map((tag) => (
            <label key={tag.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isTagExist(tag.id)}
                onChange={() => handleTagToggle(tag.id)}
              />
              {tag.name}
            </label>
          ))}
      </div>

      <div className="flex gap-2 pt-2">
        <Input
          placeholder="New tag name"
          value={newTagName.name}
          onChange={(e) => setNewTagName({ name: e.target.value })}
        />
        <Button type="button" variant="outline" onClick={handleCreateTag}>
          Add Tag
        </Button>
      </div>
    </div>
  );
};

export default DialogTagSection;

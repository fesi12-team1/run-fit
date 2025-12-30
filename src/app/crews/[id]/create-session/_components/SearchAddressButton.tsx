import Button from '@/components/ui/Button';

export default function SearchAddressButton({
  location,
  onClick,
}: {
  location: string | null;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Button
      type="button"
      variant="outlined"
      className="w-full"
      size="sm"
      onClick={onClick}
    >
      {location ? '다시 검색하기' : '주소 검색하기'}
    </Button>
  );
}

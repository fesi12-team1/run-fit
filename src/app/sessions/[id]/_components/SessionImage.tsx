import SafeImage from '@/components/ui/SafeImage';

export default function SessionImage({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  return (
    <div className="tablet:aspect-744/313 laptop:aspect-680/374 laptop:rounded-[20px] relative aspect-375/267 w-full overflow-hidden">
      <SafeImage
        src={image}
        fallbackSrc="/assets/session-default.png"
        alt={name}
        fill
        className="object-cover"
      />
    </div>
  );
}

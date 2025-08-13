import { useImageLazyLoading } from '@/hooks/useLazyLoading';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  placeholderClassName?: string;
  loadingClassName?: string;
  errorClassName?: string;
}

export function LazyImage({
  src,
  alt,
  className,
  fallbackSrc,
  placeholderClassName = 'bg-gray-200 animate-pulse',
  loadingClassName = 'opacity-0 transition-opacity duration-300',
  errorClassName = 'bg-gray-100 border-2 border-dashed border-gray-300',
  ...props
}: LazyImageProps) {
  const {
    ref,
    src: imageSrc,
    isLoaded,
    hasError,
    isVisible,
    onLoad,
    onError
  } = useImageLazyLoading(src);

  // Show placeholder while not visible or loading
  if (!isVisible || (!imageSrc && !hasError)) {
    return (
      <div
        ref={ref}
        className={cn(placeholderClassName, className)}
        role="img"
        aria-label={`Loading ${alt}`}
        {...(props as any)}
      />
    );
  }

  // Show error state
  if (hasError && !fallbackSrc) {
    return (
      <div
        ref={ref}
        className={cn(errorClassName, className)}
        role="img"
        aria-label={`Failed to load ${alt}`}
        {...(props as any)}
      >
        <span className="sr-only">Failed to load image: {alt}</span>
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={hasError ? fallbackSrc : imageSrc}
      alt={alt}
      className={cn(
        className,
        !isLoaded && loadingClassName,
        isLoaded && 'opacity-100'
      )}
      onLoad={onLoad}
      onError={onError}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}
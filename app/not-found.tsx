import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-deep flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card className="text-center py-12">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-4xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-xl font-semibold text-text-secondary mb-4">
            Page Not Found
          </h2>
          <p className="text-text-muted mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-4">
            <Link href="/en">
              <Button className="w-full">
                <Home size={16} className="mr-2" />
                Go Home
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="w-full"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
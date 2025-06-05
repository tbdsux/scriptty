import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';

const statusMessages: Record<number, string> = {
  404: 'Page Not Found',
  500: 'Internal Server Error',
  403: 'Forbidden',
  401: 'Unauthorized',
  400: 'Bad Request',
  429: 'Too Many Requests',
  503: 'Service Unavailable',
  502: 'Bad Gateway',
  504: 'Gateway Timeout',
};

const errorMessages: Record<number, string> = {
  404: 'The page you are looking for does not exist.',
  500: 'An unexpected error occurred. Please try again later.',
  403: 'You do not have permission to access this page.',
  401: 'You need to log in to access this page.',
  400: 'There was a problem with your request. Please check and try again.',
  429: 'You have made too many requests. Please wait a moment and try again.',
  503: 'The service is currently unavailable. Please try again later.',
  502: 'Bad Gateway. The server received an invalid response from the upstream server.',
  504: 'Gateway Timeout. The server did not receive a timely response from the upstream server.',
};

export default function ErrorPage(props: { status: number; message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Head title={`${props.status} | ${statusMessages[props.status]}`} />

      <Card className="px-40 py-20">
        <CardHeader className="flex flex-col items-center space-y-4">
          <div
            className={cn(
              'flex items-center justify-center space-x-2 transition-all duration-300',
            )}
          >
            <div className="flex items-center justify-center">
              <AppLogoIcon
                className={cn(
                  'size-10 rounded-full transition-all duration-300',
                )}
              />
            </div>
            <div className="grid flex-1 text-left text-base">
              <span className="mb-0.5 truncate leading-none font-semibold">
                Scriptty
              </span>
            </div>
          </div>

          <CardTitle className="text-center text-4xl font-bold">
            {props.status} - {statusMessages[props.status] || 'Error'}
          </CardTitle>

          <CardDescription>
            <p className="text-center text-lg">
              {props.message ||
                errorMessages[props.status] ||
                'An unexpected error occurred.'}
            </p>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col items-center">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              If you believe this is an error, please contact support.
            </p>
          </div>

          <Button variant="secondary" className="mt-4" asChild>
            <Link href={route('home')}>
              <ArrowLeftIcon />
              Return Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

import { Button } from '@/components/ui/Button';
import { Card, CardAction, CardItem, CardTitle } from '@/components/ui/Card';
import {
  ArrowRight,
  Briefcase as BriefcaseIcon,
  MapPin as MapPinIcon,
} from 'lucide-react';
import Link from 'next/link';
import { getVisibleCompanies } from '../networks.utils';

interface Props {
  id: string;
  name: string;
  company: string[];
  location: { city: string; country: string };
}

const NetworksListItem = ({ id, name, company, location }: Props) => {
  const maxVisibleChars = 30;
  const { visibleCompanies, hiddenCount } = getVisibleCompanies(
    company,
    maxVisibleChars
  );

  return (
    <Card tabIndex={0} className="relative card-animate">
      <Link href={`/networks/${id}`} shallow>
        <CardTitle>{name}</CardTitle>

        <CardItem>
          <div className="flex justify-center items-center bg-primary-50 w-6 h-6 rounded-s">
            <MapPinIcon className="w-4 h-4 text-secondary-400" />
          </div>
          <h3 className="text-sm leading-7 text-zinc-500">
            {location.city}, {location.country}
          </h3>
        </CardItem>

        <CardItem className="mb-0">
          <div className="flex justify-center items-center bg-primary-50 w-6 h-6 rounded-s">
            <BriefcaseIcon className="w-4 h-4 text-secondary-400" />
          </div>
          <h4 className="text-sm leading-7 text-zinc-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-[236px]">
            {visibleCompanies}
          </h4>
          {hiddenCount > 0 && company.length > 1 && (
            <span className="border border-secondary-400 text-secondary-400 text-sm rounded-[2px] px-2 py-1">
              + {hiddenCount}
            </span>
          )}
        </CardItem>

        <CardAction className="card-action-animate">
          <Button
            variant={'secondary'}
            className="flex bg-transparent items-center group text-secondary-500"
          >
            <span className="card-action-animate-label">Details</span>
            <ArrowRight
              className="ml-1 transition-transform duration-500 ease-out z-10"
              size={20}
            />
          </Button>
        </CardAction>
      </Link>
    </Card>
  );
};

export default NetworksListItem;

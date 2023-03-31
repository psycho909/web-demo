internal class Person
{
    public String Name;
    public int Money;

    public Person(String name, int money)
    {
        this.Name = name;
        this.Money = money;
    }

    public void borrow(Person lender, int money)
    {
        lender.Money -= money;
        this.Money += money;
    }

    public void repay(Person lender, int money)
    {
        this.Money -= money;
        lender.Money += money;
    }
}
private void submitButton_Click(object sender, EventArgs e)
{
    i = new Person(myNameInput.Text, 0);
    friend = new Person(friendNameInput.Text, 200000);

    myNameInput.Enabled = false;
    friendNameInput.Enabled = false;
    submitButton.Enabled = false;

    borrowButton.Text = "";
    borrowButton.Enabled = true;
    repayButton.Enabled = true;
}